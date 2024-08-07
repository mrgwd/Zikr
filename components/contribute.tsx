import { Bug, GitHub } from "./icons";

export default function Contribute() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium">
      <a
        href="https://github.com/mrgwd/Zikr"
        target="_blank"
        className="group flex items-center justify-center gap-2 text-light-muted transition-all hover:text-dark-secondary dark:text-dark-muted dark:hover:text-light-secondary"
      >
        <p>ساهم في تطوير المشروع </p>
        <GitHub className="fill-light-muted text-light-muted transition-all group-hover:fill-dark-secondary dark:fill-dark-muted dark:group-hover:fill-light-secondary" />
      </a>
      <a
        href="mailto:mogdwd@gmail.com"
        target="_blank"
        className="group mt-2 flex items-center justify-center gap-2 text-light-muted transition-all hover:text-dark-secondary dark:text-dark-muted dark:hover:text-light-secondary"
      >
        <p>بلغ عن مشلكة أو أطلب ميزة </p>
        <Bug className="fill-light-muted transition-all group-hover:fill-dark-secondary dark:fill-dark-muted dark:group-hover:fill-light-secondary" />
      </a>
    </div>
  );
}
