type Props = {
  color?: string;
};

const MoneyIcon = ({ color = "#6EC531" }: Props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 21.165H7C4 21.165 2 19.665 2 16.165V9.16504C2 5.66504 4 4.16504 7 4.16504H17C20 4.16504 22 5.66504 22 9.16504V16.165C22 19.665 20 21.165 17 21.165Z"
        stroke={color}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.665C13.6569 15.665 15 14.3219 15 12.665C15 11.0082 13.6569 9.66504 12 9.66504C10.3431 9.66504 9 11.0082 9 12.665C9 14.3219 10.3431 15.665 12 15.665Z"
        stroke={color}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M8.5 6.66504H7C5.62 6.66504 4.5 7.78504 4.5 9.16504V10.665"
        stroke={color}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M15.5 6.66504H17C18.38 6.66504 19.5 7.78504 19.5 9.16504V10.665"
        stroke={color}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M8.5 18.665H7C5.62 18.665 4.5 17.545 4.5 16.165V14.665"
        stroke={color}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M15.5 18.665H17C18.38 18.665 19.5 17.545 19.5 16.165V14.665"
        stroke={color}
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MoneyIcon;
