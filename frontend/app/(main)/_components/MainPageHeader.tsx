"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useDrag, useDrop, DragSourceMonitor, DropTargetMonitor, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// 타입 정의
interface Item {
  id: string;
  content: string;
}

interface ScrollableItemProps {
  item: Item;
  isCurrent: boolean;
  onClick: (item: Item) => void;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  isScrolling: boolean;
}

// 드래그 가능한 아이템을 렌더링하는 함수
const ScrollableItem: React.FC<ScrollableItemProps> = ({ 
  item, 
  isCurrent, 
  onClick, 
  index, 
  moveItem,
  isScrolling
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { index },
    canDrag: !isScrolling, // 스크롤 중에는 드래그 불가
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (item: { index: number }, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return;
      }
      if (item.index === index) {
        return;
      }
      moveItem(item.index, index);
      item.index = index;
    },
  });

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className={`py-2 text-center text-lg cursor-move transition-opacity ${
        isCurrent ? "font-bold text-gray-900" : "text-gray-500"
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
      onClick={() => onClick(item)}
    >
      {item.content}
    </div>
  );
};

// 데이터 목록 생성
const getItems = (type: "day" | "time", start?: number, end?: number): Item[] => {
  const items: Item[] = [];
  if (type === "day") {
    const days = ["월", "화", "수", "목", "금"];
    for (const day of days) {
      items.push({ id: `day-${day}`, content: day });
    }
  } else if (type === "time" && start !== undefined && end !== undefined) {
    for (let h = start; h <= end; h++) {
      for (let m = 0; m < 60; m += 30) {
        const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        items.push({ id: `time-${h}-${m}`, content: time });
      }
    }
  }
  return items;
};

const initialDays = getItems("day");
const initialStartTimes = getItems("time", 8, 23);
const initialEndTimes = getItems("time", 8, 24);

export default function MainPageHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [days, setDays] = useState<Item[]>(initialDays);
  const [startTimes, setStartTimes] = useState<Item[]>(initialStartTimes);
  const [endTimes, setEndTimes] = useState<Item[]>(initialEndTimes);
  const [selectedDay, setSelectedDay] = useState<Item>(days[1]); // 화요일
  const [selectedStartTime, setSelectedStartTime] = useState<Item>(startTimes[8]); // 12:00
  const [selectedEndTime, setSelectedEndTime] = useState<Item>(endTimes[10]); // 13:00
  const [isScrolling, setIsScrolling] = useState(false);

  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startTimeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const endTimeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTimeoutRef = useRef<number | undefined>(undefined);

  // 아이템 이동 함수들
  const moveDay = useCallback((dragIndex: number, hoverIndex: number) => {
    if (isScrolling) return; // 스크롤 중에는 이동 금지
    setDays((prevDays) => {
      const newDays = [...prevDays];
      const [removed] = newDays.splice(dragIndex, 1);
      newDays.splice(hoverIndex, 0, removed);
      return newDays;
    });
    
    // 선택된 아이템의 인덱스도 함께 업데이트
    if (dragIndex === days.findIndex(item => item.id === selectedDay.id)) {
      setSelectedDay(days[hoverIndex]);
    } else if (hoverIndex === days.findIndex(item => item.id === selectedDay.id)) {
      setSelectedDay(days[dragIndex]);
    }
  }, [isScrolling, days, selectedDay]);

  const moveStartTime = useCallback((dragIndex: number, hoverIndex: number) => {
    if (isScrolling) return; // 스크롤 중에는 이동 금지
    setStartTimes((prevTimes) => {
      const newTimes = [...prevTimes];
      const [removed] = newTimes.splice(dragIndex, 1);
      newTimes.splice(hoverIndex, 0, removed);
      return newTimes;
    });
    
    // 선택된 아이템의 인덱스도 함께 업데이트
    if (dragIndex === startTimes.findIndex(item => item.id === selectedStartTime.id)) {
      setSelectedStartTime(startTimes[hoverIndex]);
    } else if (hoverIndex === startTimes.findIndex(item => item.id === selectedStartTime.id)) {
      setSelectedStartTime(startTimes[dragIndex]);
    }
  }, [isScrolling, startTimes, selectedStartTime]);

  const moveEndTime = useCallback((dragIndex: number, hoverIndex: number) => {
    if (isScrolling) return; // 스크롤 중에는 이동 금지
    setEndTimes((prevTimes) => {
      const newTimes = [...prevTimes];
      const [removed] = newTimes.splice(dragIndex, 1);
      newTimes.splice(hoverIndex, 0, removed);
      return newTimes;
    });
    
    // 선택된 아이템의 인덱스도 함께 업데이트
    if (dragIndex === endTimes.findIndex(item => item.id === selectedEndTime.id)) {
      setSelectedEndTime(endTimes[hoverIndex]);
    } else if (hoverIndex === endTimes.findIndex(item => item.id === selectedEndTime.id)) {
      setSelectedEndTime(endTimes[dragIndex]);
    }
  }, [isScrolling, endTimes, selectedEndTime]);

  // 모달이 열릴 때만 스크롤 위치를 현재 선택된 항목으로 이동
  useEffect(() => {
    if (isModalOpen) {
      // 모달이 열린 직후에만 스크롤 위치 조정
      const timer = setTimeout(() => {
        const dayIndex = days.findIndex(item => item.id === selectedDay.id);
        dayRefs.current[dayIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const startTimeIndex = startTimes.findIndex(item => item.id === selectedStartTime.id);
        startTimeRefs.current[startTimeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const endTimeIndex = endTimes.findIndex(item => item.id === selectedEndTime.id);
        endTimeRefs.current[endTimeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100); // 모달 애니메이션이 완료된 후 실행

      return () => clearTimeout(timer);
    }
  }, [isModalOpen]); // isModalOpen만 의존성으로 설정

  // 스크롤 이벤트 핸들러 (선택된 항목 시각적으로 업데이트)
  const handleScroll = (
    event: React.UIEvent<HTMLDivElement>, 
    items: Item[], 
    setSelectedItem: React.Dispatch<React.SetStateAction<Item>>
  ) => {
    setIsScrolling(true);
    
    // 기존 타이머 클리어
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    
    // 스크롤 완료 후 150ms 뒤에 드래그 활성화
    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    const container = event.target as HTMLDivElement;
    const itemHeight = container.querySelector(".py-2")?.clientHeight || 0;
    if (itemHeight === 0) return;

    const centerIndex = Math.floor(container.scrollTop / itemHeight + 0.5);
    const newSelectedItem = items[centerIndex];
    if (newSelectedItem) {
      setSelectedItem(newSelectedItem);
    }
  };

  const dayString = `${selectedDay.content} ${selectedStartTime.content}~${selectedEndTime.content}`;

  return (
    <DndProvider backend={HTML5Backend}>
      <header className="fixed z-20 w-full bg-white shadow-md px-4 py-3 flex flex-col">
        {/* 로고 + 타이틀 */}
        <div className="flex items-center gap-2">
          <img
            src="/small_logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <h1 className="text-lg font-bold text-green-700">Let's LunChat!</h1>
        </div>

        {/* 요일/시간 모달 */}
        <div className="mt-1">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-gray-700 font-medium p-0 h-auto"
              >
                {dayString}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px] rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold text-center">
                  요일 & Start & End
                </DialogTitle>
              </DialogHeader>
              <div className="flex justify-between items-center space-x-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                {/* 요일 선택 */}
                <div 
                  className="flex-1 overflow-y-scroll h-40 scroll-smooth border border-gray-200 rounded p-2"
                  onScroll={(e) => handleScroll(e, days, setSelectedDay)}
                >
                  {days.map((item, index) => (
                    <div key={item.id} ref={(el) => { dayRefs.current[index] = el; }}>
                      <ScrollableItem
                        item={item}
                        isCurrent={item.id === selectedDay.id}
                        onClick={setSelectedDay}
                        index={index}
                        moveItem={moveDay}
                        isScrolling={isScrolling}
                      />
                    </div>
                  ))}
                </div>

                {/* 시작 시간 선택 */}
                <div 
                  className="flex-1 overflow-y-scroll h-40 scroll-smooth border border-gray-200 rounded p-2"
                  onScroll={(e) => handleScroll(e, startTimes, setSelectedStartTime)}
                >
                  {startTimes.map((item, index) => (
                    <div key={item.id} ref={(el) => { startTimeRefs.current[index] = el; }}>
                      <ScrollableItem
                        item={item}
                        isCurrent={item.id === selectedStartTime.id}
                        onClick={setSelectedStartTime}
                        index={index}
                        moveItem={moveStartTime}
                        isScrolling={isScrolling}
                      />
                    </div>
                  ))}
                </div>

                {/* 끝 시간 선택 */}
                <div 
                  className="flex-1 overflow-y-scroll h-40 scroll-smooth border border-gray-200 rounded p-2"
                  onScroll={(e) => handleScroll(e, endTimes, setSelectedEndTime)}
                >
                  {endTimes.map((item, index) => (
                    <div key={item.id} ref={(el) => { endTimeRefs.current[index] = el; }}>
                      <ScrollableItem
                        item={item}
                        isCurrent={item.id === selectedEndTime.id}
                        onClick={setSelectedEndTime}
                        index={index}
                        moveItem={moveEndTime}
                        isScrolling={isScrolling}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </DndProvider>
  );
}
