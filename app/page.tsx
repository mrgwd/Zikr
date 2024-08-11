"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Sebha from "@/components/sebha";
import { SebhaProvider } from "@/contexts/SebhaProvider";
import BrowserNotSupported from "@/components/browserNotSupported";
import Footer from "@/components/footer";
import { AzkarProvider } from "@/contexts/AzkarProvider";
import Contribute from "@/components/contribute";
import DarkMode from "@/components/darkmode";
import Stepper from "@/components/stepper";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { step, StepperProps } from "@/interfaces/appTypes";
import Spinner from "@/components/spinner";
import WhatIsNew from "@/components/whatIsNew";

export default function Home() {
  const [hasBrowserSupport, setHasbrowserSupport] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showStepper, setShowStepper] = useLocalStorage("stepper", true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const steps: step[] = [
    {
      title: "زيادة الدعم لجميع الأجهزة",
      description:
        "Zikr AI أصبح متوفر الآن على جميع الأجهزة بما في ذلك الهاتف المحمول والجهاز اللوحي والكمبيوتر.",
      image: "/images/features/2.jpg",
    },
    {
      title: "تحسينات عامة وإصلاح بعض الأخطاء",
      description:
        "تم إجراء تحسينات عامة وإصلاح بعض الأخطاء في ال codebase، لتفاصيل أكثر توجه إلى https://github.com/mrgwd/zikr",
    },
  ];

  const handleClose = () => {
    setShowStepper(false);
  };
  const handleShowStepper = () => {
    setShowStepper(true);
    setCurrentStep(0);
  };

  const stepperProps: StepperProps = {
    steps,
    currentStep,
    version: "1.3.0",
    setCurrentStep,
    handleClose,
  };

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      setHasbrowserSupport(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="mx-auto flex h-screen w-screen items-center justify-center bg-light-secondary text-dark-primary transition-all duration-300 dark:bg-dark-primary dark:text-light-secondary">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="m-4 mb-20 flex w-min flex-col gap-3 whitespace-nowrap">
          <AzkarProvider>
            <SebhaProvider>
              {hasBrowserSupport ? (
                <>
                  {showStepper && <Stepper {...stepperProps} />}
                  <div className="absolute right-14 top-6 flex items-end gap-12">
                    <DarkMode />
                    <WhatIsNew handleModalOpen={handleShowStepper} />
                  </div>
                  <Header />
                  <Sebha />
                  <Footer />
                </>
              ) : (
                <BrowserNotSupported />
              )}
            </SebhaProvider>
          </AzkarProvider>
          <Contribute />
        </div>
      )}
    </main>
  );
}
