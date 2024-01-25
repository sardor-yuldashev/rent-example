'use client';

interface HeadingProps {
    title: string;
    subtitle: string;
    center?: boolean;
};



const Heading: React.FC<HeadingProps> = ({
    title,
    subtitle,
    center
}) => {

    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-2xl font-bold text-slate-200">
                {title}
            </div>
            <div className="font-light text-slate-400 mt-2">
                {subtitle}
            </div>
        </div>
    );
};

export default Heading;