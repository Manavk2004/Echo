import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react";
import { cn } from "../lib/utils.js";


interface ConversationStatusIconProps {
    status: "unresolved" | "escalated" | "resolved"
}

const statusConfig = {
    resolved: {
        icon: CheckIcon,
        bgColor: "bg-[#3fb26f]"

    },
    unresolved: {
        icon: ArrowRightIcon,
        bgColor: "bg-destructive",
        
    },
    escalated: {
        icon: ArrowUpIcon,
        bgColor: "bg-yellow-50",
        
    }
} as const

export const ConversationStatusIcon = ({
    status,
}: ConversationStatusIconProps) => {
    const config = statusConfig[status]
    const icon = config.icon;

    return(
        <div className={cn(
            "flex items-center justify-center rounded-full p-1.5",
            config.bgColor
        )}>
            <Icon className="size-3 stroke-3 text-white"/>
        </div>
    )
}