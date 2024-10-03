type Props = {
  color?: string;
};

const EyeIcon = ({ color = "#2D2D2D" }: Props) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.0409 8.51172L8.82422 12.7284C8.28255 12.1867 7.94922 11.4451 7.94922 10.6201C7.94922 8.97005 9.28255 7.63672 10.9326 7.63672C11.7576 7.63672 12.4992 7.97005 13.0409 8.51172Z"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7854 5.42852C14.3271 4.32852 12.6604 3.72852 10.9354 3.72852C7.99375 3.72852 5.25208 5.46185 3.34375 8.46185C2.59375 9.63685 2.59375 11.6118 3.34375 12.7868C4.00208 13.8202 4.76875 14.7118 5.60208 15.4285"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M7.94922 16.8952C8.89922 17.2952 9.90755 17.5118 10.9326 17.5118C13.8742 17.5118 16.6159 15.7785 18.5242 12.7785C19.2742 11.6035 19.2742 9.62852 18.5242 8.45352C18.2492 8.02018 17.9492 7.61185 17.6409 7.22852"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.4"
        d="M13.8578 11.2031C13.6411 12.3781 12.6828 13.3365 11.5078 13.5531"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.82656 12.7285L2.60156 18.9535"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.268 2.28711L13.043 8.51211"
        stroke={color}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeIcon;
