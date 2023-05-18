import { useState } from "react";
import Button from "../Button/Button";

interface Props {
    children: string;
    maxChars?: number;
}

function ExpandableText({ children, maxChars = 100 }: Props) {
    const [isExpanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!isExpanded);
    };

    if (children.length < maxChars) return <p>{children}...</p>

    return (
        <p>
            {isExpanded ? children : children.substring(0, maxChars)}...
            <Button onClick={handleClick}>{isExpanded ? 'Less' : 'More'}</Button>
        </p>
    );
}

export default ExpandableText;