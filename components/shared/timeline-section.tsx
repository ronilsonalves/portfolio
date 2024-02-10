import { TimelineItem } from "@/components/shared/timeline-item";
import type { MilestoneItem } from "@/types/milestone-item";

interface TimelineItem {
  title: string;
  milestones: MilestoneItem[];
}

export function TimelineSection({ timelines }: { timelines: TimelineItem[] }) {  
  return (
    <div className="flex flex-col gap-4 pt-16 text-black dark:text-white md:flex-row">
      {timelines?.map((timeline, key) => {
        const { title, milestones } = timeline;
        return (
          <div className="max-w-[80%] md:max-w-[50%]" key={key}>
            <div className="pb-5 text-xl font-bold dark:text-white">{title}</div>

            {milestones?.map((experience, index) => (
              <div key={index}>
                <TimelineItem
                  milestone={experience}
                  isLast={milestones.length - 1 === index}
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}