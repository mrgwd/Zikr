import { Help } from "./icons";

interface WhatIsNewProps {
  handleModalOpen: () => void;
}
export default function WhatIsNew({ handleModalOpen }: WhatIsNewProps) {
  return (
    <button type="button" onClick={handleModalOpen}>
      <Help className="absolute fill-dark-secondary opacity-15 transition-all hover:opacity-100 dark:fill-light-secondary" />
    </button>
  );
}
