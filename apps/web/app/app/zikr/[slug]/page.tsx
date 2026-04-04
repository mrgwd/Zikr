import { JSX } from "react";
import { getZikrData } from "@workspace/azkar/helpers";
import { ZikrInfo } from "@workspace/azkar/types";
import { ArrowRight } from "@workspace/ui/index";
import { Button } from "@workspace/ui/components/button";
import ZikrInfoList from "@workspace/ui/layout/ZikrInfoList";
import Link from "next/link";
import { SupportedAzkar } from "@workspace/azkar/constants";

export async function generateStaticParams() {
  const slugs = SupportedAzkar.map((z) => z.id);
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function HadithPage({
  params,
}: {
  params: { slug: Promise<string> };
}): Promise<JSX.Element> {
  const slug = await (await params).slug;
  const data: ZikrInfo[] = await getZikrData(slug);
  return (
    <div className="space-y-2">
      <Link href="/app">
        <Button variant="ghost" className="my-4">
          <ArrowRight />
          عودة
        </Button>
      </Link>
      <ZikrInfoList zikrInfoList={data} LinkComponent={Link} />
    </div>
  );
}
