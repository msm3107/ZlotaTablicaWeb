import type { SVGProps } from "react";

type IconName =
  | "arrow"
  | "down"
  | "pin"
  | "check"
  | "clock"
  | "filter"
  | "register"
  | "telegram"
  | "house"
  | "external"
  | "plus"
  | "mail";

const paths: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  down: (
    <>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </>
  ),
  pin: (
    <>
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <path d="M8 3v6M16 9v6M10 15v6" />
    </>
  ),
  register: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),
  telegram: (
    <>
      <path d="m21 3-4 18-6-5-4 3v-6L3 10 21 3Z" />
      <path d="m7 13 10-6-6 9" />
    </>
  ),
  house: (
    <>
      <path d="m3 11 9-8 9 8M5 9v11h14V9M9 20v-7h6v7" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6M20 4l-9 9M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
};

export function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
