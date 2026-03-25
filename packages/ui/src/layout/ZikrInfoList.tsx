import { type ZikrInfo } from "@workspace/azkar/types";
import CopyButton from "./CopyButton";
import { Copy } from "../index";
import ZikrInfoCard from "./ZikrInfoCard";

export default function ZikrInfoList({
  zikrInfoList,
  LinkComponent = "a",
}: {
  zikrInfoList: ZikrInfo[];
  LinkComponent?: React.ElementType;
}) {
  return (
    <>
      {zikrInfoList.map((item, index) => (
        <ZikrInfoCard
          key={item.id}
          className="animate-fade opacity-0"
          style={{
            animationDelay: `${(index + 1) * 50}ms`,
          }}
        >
          <ZikrInfoCard.Text>{item.text}</ZikrInfoCard.Text>
          <ZikrInfoCard.Footer>
            <LinkComponent
              href={item.source.url}
              target="_blank"
              className="underline"
            >
              {item.source.name}
            </LinkComponent>
            <CopyButton
              variant="ghost"
              toBeCopied={`${item.text} \n- ${item.source.name}`}
            >
              <Copy />
            </CopyButton>
          </ZikrInfoCard.Footer>
        </ZikrInfoCard>
      ))}
    </>
  );
}
