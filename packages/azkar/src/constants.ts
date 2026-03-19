import type { Zikr } from "./types";

export const AzkarList: Zikr[] = [
  {
    id: "sbhn",
    label: "سبحان الله",
    href: "subhanallah",
    count: 0,
    lastAccuracy: 0,
    render: true,
  },
  {
    id: "hamd",
    label: "الحمد لله",
    href: "alhamdulillah",
    count: 0,
    lastAccuracy: 0,
    render: true,
  },
  {
    id: "akbr",
    label: "الله أكبر",
    href: "allahuakbar",
    count: 0,
    lastAccuracy: 0,
    render: true,
  },
];
export const SupportedAzkar = AzkarList.filter((z) => z.render);
export const getAzkarKeys = (): string[] => SupportedAzkar.map((z) => z.id);
