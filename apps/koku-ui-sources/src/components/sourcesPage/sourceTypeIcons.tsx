import React from 'react';

const DEFAULT_SIZE = 48;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/** Red Hat OpenShift logo – red hat/circle */
const OpenShiftIcon: React.FC<IconProps> = ({ size = DEFAULT_SIZE, ...props }) => (
  <svg viewBox="0 0 60 60" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="30" cy="30" r="28" fill="#EE0000" />
    <path
      d="M30 12c-9.94 0-18 8.06-18 18s8.06 18 18 18 18-8.06 18-18-8.06-18-18-18zm0 4c7.73 0 14 6.27 14 14s-6.27 14-14 14-14-6.27-14-14 6.27-14 14-14z"
      fill="white"
    />
    <ellipse cx="30" cy="30" rx="8" ry="4" fill="#EE0000" />
  </svg>
);

/** AWS logo – orange smile/arrow */
const AwsIcon: React.FC<IconProps> = ({ size = DEFAULT_SIZE, ...props }) => (
  <svg viewBox="0 0 60 60" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M30 8c12.15 0 22 9.85 22 22s-9.85 22-22 22S8 42.15 8 30 17.85 8 30 8z" fill="#FF9900" />
    <path
      d="M18 34c0-2 1-3 3-3 1 0 2 .5 2.5 1.5.5 1 .5 2 0 3-.5 1-1.5 1.5-2.5 1.5-2 0-3-1-3-3zm12-6c3 0 5 2 5 5 0 2-1.5 3.5-3.5 4 1.5.5 2.5 2 2.5 4 0 3-2 5-5 5-2 0-3.5-1-4-2.5.5-.5 1-1 1.5-1.5.5 1.5 1.5 2.5 3 2.5 2 0 3-1 3-3 0-2-2-3-4-3-2 0-3 1-3.5 2l-1-.5c.5-2 2-3.5 4.5-3.5zm12 0c2.5 0 4 1.5 4.5 3.5l-1 .5c-.5-1-1.5-2-3.5-2-2 0-4 1-4 3 0 2 1 3 3 3 1.5 0 2.5-1 3-2.5.5.5 1 1 1.5 1.5.5 1.5 1.5 2.5 3 2.5 2 0 3-1 3-3 0-2-1-3.5-2.5-4 2-.5 3.5-2 3.5-4 0-3-2-5-5-5z"
      fill="white"
    />
  </svg>
);

/** Azure logo – blue triangle/diamond */
const AzureIcon: React.FC<IconProps> = ({ size = DEFAULT_SIZE, ...props }) => (
  <svg viewBox="0 0 60 60" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="60" height="60" rx="8" fill="#0078D4" />
    <path d="M30 14L14 46h10l4-14 8 14h10L30 14z" fill="white" />
  </svg>
);

/** GCP logo – multi-colored G (blue, red, yellow, green) */
const GcpIcon: React.FC<IconProps> = ({ size = DEFAULT_SIZE, ...props }) => (
  <svg viewBox="0 0 60 60" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="30" cy="30" r="28" fill="#4285F4" />
    <path d="M30 18v8l6-2c0-3.3-2.7-6-6-6z" fill="#EA4335" />
    <path d="M30 34l-6-2v-6c0 3.3 2.7 6 6 8z" fill="#34A853" />
    <path d="M36 28l-6 2v-8c3.3 0 6 2.7 6 6z" fill="#FBBC04" />
    <path d="M24 28c0-3.3 2.7-6 6-6v8l-6-2z" fill="white" />
  </svg>
);

export const sourceTypeIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  OCP: OpenShiftIcon,
  AWS: AwsIcon,
  Azure: AzureIcon,
  GCP: GcpIcon,
};

export { OpenShiftIcon, AwsIcon, AzureIcon, GcpIcon };
