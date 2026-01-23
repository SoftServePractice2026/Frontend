interface LogoProps {
    className?: string;
}

export default function Logo( {className }: LogoProps) {
    return (
        <>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
                <rect width="100%" height="100%" rx="10" fill="currentColor" />
                <g clip-path="url(#clip0_70_178)">
                    <path d="M30.9999 14.6666L33.3333 19.3333H29.8333L27.4999 14.6666H25.1666L27.4999 19.3333H23.9999L21.6666 14.6666H19.3333L21.6666 19.3333H18.1666L15.8333 14.6666H14.6666C13.3833 14.6666 12.3449 15.7166 12.3449 17L12.3333 31C12.3333 32.2833 13.3833 33.3333 14.6666 33.3333H33.3333C34.6166 33.3333 35.6666 32.2833 35.6666 31V14.6666H30.9999Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_70_178">
                        <rect width="23.3333" height="18.6667" fill="white" transform="translate(12.3333 14.6666)" />
                    </clipPath>
                </defs>
            </svg>
        </>
    );
}