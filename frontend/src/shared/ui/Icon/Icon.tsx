import type {SVGAttributes} from "react";

type IconName = 'logo';

interface IconProps extends SVGAttributes<SVGSVGElement> {
    name: IconName;
}

export const Icon = ({name, className, ...props}: IconProps) => {

    switch (name) {
        case 'logo':
            return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className={className} {...props}>
                <rect width="32" height="32" rx="2" fill="currentColor"/>
                <path
                    d="M9 16l5 5 9-9"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        default:
            return null;
    }
}