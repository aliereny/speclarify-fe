"use client";
import { Divider, Flex, MenuProps, Steps, theme } from "antd";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./StepsLayout.module.scss";

const items: MenuProps["items"] = [
  {
    key: "dashboard",
    label: "Projects",
  },
];

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) {
  const { token } = theme.useToken();

  const [current, setCurrent] = useState(0);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const index = routes.findIndex((route) => route === pathname);
    setCurrent(index);
  }, [pathname]);

  const routes = [
    `/projects/${params.projectId}/upload`,
    `/projects/${params.projectId}/review`,
    `/projects/${params.projectId}/remove-duplicates`,
    `/projects/${params.projectId}/remove-inconsistencies`,
    `/projects/${params.projectId}/fix-ambiguities`,
    `/projects/${params.projectId}/prioritize`,
    `/projects/${params.projectId}/classify`,
    `/projects/${params.projectId}/export`,
  ];

  const onChange = (value: number) => {
    setCurrent(value);
    router.push(routes[value]);
  };

  return (
    <Flex className={styles.wrapper} gap={16}>
      <div>
        <Steps
          size={"small"}
          style={{ width: "auto" }}
          current={current}
          onChange={onChange}
          direction="vertical"
          items={[
            {
              title: "Upload a file",
            },
            {
              title: "Review requirements",
            },
            {
              title: "Remove duplicates",
            },
            {
              title: "Remove Inconsistencies",
            },
            {
              title: "Fix ambiguities",
            },
            {
              title: "Prioritize",
            },
            {
              title: "Classify",
            },
            {
              title: "Export",
            },
          ]}
        />
      </div>
      <Divider type={"vertical"} style={{ height: "100%" }} />
      {children}
    </Flex>
  );
}
