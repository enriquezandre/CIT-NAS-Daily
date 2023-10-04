import { Link, useLocation } from 'react-router-dom';

export const OASButtons = () => {
    const location = useLocation();

    const getButtonClasses = (route, activeClass, defaultClass) => {
        return location.pathname === route ? activeClass : defaultClass;
    };
    
    return(
        <div class="w-9/10 mx-8 mb-6 flex gap-4">
            <Link to="/offices" className={`font-medium rounded-lg text-sm w-1/6 py-2.5 text-center 
                ${getButtonClasses('/offices', 'text-secondary', 'text-primary')}
                ${getButtonClasses('/offices', 'bg-primary', 'bg-secondary')}
                ${getButtonClasses('/offices', 'hover:bg-primary', 'hover:bg-primary')}
                ${getButtonClasses('/offices', 'hover:text-secondary', 'hover:text-secondary')}
                `}
            >
                OFFICES
            </Link>
            <Link to="/attendance" className={`font-medium rounded-lg text-sm w-1/6 py-2.5 text-center 
                ${getButtonClasses('/attendance', 'text-secondary', 'text-primary')}
                ${getButtonClasses('/attendance', 'bg-primary', 'bg-secondary')}
                ${getButtonClasses('/offices', 'hover:bg-primary', 'hover:bg-primary')}
                ${getButtonClasses('/offices', 'hover:text-secondary', 'hover:text-secondary')}
                `}
            >
                ATTENDANCE
            </Link>
            <Link to="/eval" className={`font-medium rounded-lg text-sm w-1/6 py-2.5 text-center 
                ${getButtonClasses('/eval', 'text-secondary', 'text-primary')}
                ${getButtonClasses('/eval', 'bg-primary', 'bg-secondary')}
                ${getButtonClasses('/offices', 'hover:bg-primary', 'hover:bg-primary')}
                ${getButtonClasses('/offices', 'hover:text-secondary', 'hover:text-secondary')}
                `}
            >
                EVALUATION
            </Link>
            <Link to="/status" className={`font-medium rounded-lg text-sm w-1/6 py-2.5 text-center 
                ${getButtonClasses('/status', 'text-secondary', 'text-primary')}
                ${getButtonClasses('/status', 'bg-primary', 'bg-secondary')}
                ${getButtonClasses('/offices', 'hover:bg-primary', 'hover:bg-primary')}
                ${getButtonClasses('/offices', 'hover:text-secondary', 'hover:text-secondary')}
                `}
            >
                NAS STATUS
            </Link>
            <Link to="/validation" className={`font-medium rounded-lg text-sm w-1/6 py-2.5 text-center 
                ${getButtonClasses('/validation', 'text-secondary', 'text-primary')}
                ${getButtonClasses('/validation', 'bg-primary', 'bg-secondary')}
                ${getButtonClasses('/offices', 'hover:bg-primary', 'hover:bg-primary')}
                ${getButtonClasses('/offices', 'hover:text-secondary', 'hover:text-secondary')}
                `}
            >
                VALIDATION
            </Link>
            <Link to="/masterlist" className={`font-medium rounded-lg text-sm w-1/6 py-2.5 text-center 
                ${getButtonClasses('/masterlist', 'text-secondary', 'text-primary')}
                ${getButtonClasses('/masterlist', 'bg-primary', 'bg-secondary')}
                ${getButtonClasses('/offices', 'hover:bg-primary', 'hover:bg-primary')}
                ${getButtonClasses('/offices', 'hover:text-secondary', 'hover:text-secondary')}
                `}
            >
                NAS MASTER LIST
            </Link>
        </div>
    );
}