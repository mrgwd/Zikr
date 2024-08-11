import { step, StepperProps } from "@/interfaces/appTypes";
import Image from "next/image";

export default function Stepper({
  steps,
  currentStep,
  version,
  setCurrentStep,
  handleClose,
}: StepperProps) {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="mx-6 flex max-w-min flex-col gap-6 rounded-3xl bg-light-primary p-8 leading-snug dark:bg-dark-secondary">
        <div>
          <div className="flex justify-between">
            <h1 className="text-xl font-bold text-dark-primary dark:text-light-secondary">
              ما الجديد! v{version}
            </h1>
            <p>
              {currentStep + 1}/{steps.length}
            </p>
          </div>
          <p className="text-dark-muted dark:text-light-muted">
            تحقق من آخر التحديثات والميزات في التطبيق.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {steps[currentStep].image && (
            <div className="relative h-28 w-full overflow-hidden rounded-lg">
              <Image
                className="w-full"
                src={steps[currentStep].image || ""}
                alt="image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
          <div className="text-wrap text-dark-primary dark:text-light-secondary">
            <h2 className="font-semibold">
              {currentStep + 1}. {steps[currentStep].title}
            </h2>
            <p className="text-dark-muted dark:text-light-muted">
              {steps[currentStep].description}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => prev - 1)}
            className={`${
              currentStep === 0
                ? "cursor-not-allowed bg-dark-muted opacity-60 dark:bg-dark-muted"
                : "bg-dark-muted hover:bg-light-muted dark:hover:bg-zinc-600"
            }   dark:text-light rounded-lg px-4 py-1.5 text-light-primary`}
          >
            السابق
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-4 py-1.5 underline dark:text-light-primary"
            >
              تخطي
            </button>

            <button
              type="button"
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleClose();
                } else {
                  setCurrentStep((prev) => prev + 1);
                }
              }}
              className="dark:text-light rounded-lg bg-primary px-4 py-1.5 text-light-primary hover:bg-secondary"
            >
              {currentStep === steps.length - 1 ? "إغلاق" : "التالي"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
