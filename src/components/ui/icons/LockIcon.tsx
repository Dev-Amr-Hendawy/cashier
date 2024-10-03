type Props = {
  color?: string;
};

const LockIcon = ({ color = "#2D2D2D" }: Props) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M6.92969 10.9395V8.93945C6.92969 5.62945 7.92969 2.93945 12.9297 2.93945C17.9297 2.93945 18.9297 5.62945 18.9297 8.93945V10.9395"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.9297 22.9395H7.92969C3.92969 22.9395 2.92969 21.9395 2.92969 17.9395V15.9395C2.92969 11.9395 3.92969 10.9395 7.92969 10.9395H17.9297C21.9297 10.9395 22.9297 11.9395 22.9297 15.9395V17.9395C22.9297 21.9395 21.9297 22.9395 17.9297 22.9395Z"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M16.9242 16.9395H16.9332"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M12.9242 16.9395H12.9332"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M8.92419 16.9395H8.93318"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LockIcon;
