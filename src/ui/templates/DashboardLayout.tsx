"use client";
import { Flex, Layout, Menu, MenuProps, theme } from "antd";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const items: MenuProps["items"] = [
  {
    key: "projects",
    label: "Projects",
  },  {
    key: "elicitation",
    label: "Elicitation",
  },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token } = theme.useToken();

  const [current, setCurrent] = useState("projects");
  const router = useRouter();
  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`/${e.key}`);
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Layout.Header
        style={{
          background: token.colorBgContainer,
          display: "flex",
          alignItems: "center",
          padding: "0",
        }}
      >
        <Flex
          className={"container"}
          style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Image
              src={"/logo-colored.png"}
              alt="Logo"
              width={116}
              height={26}
            />
          </Link>
          <Menu
            theme="light"
            mode="horizontal"
            onClick={onClick}
            selectedKeys={[current]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Flex>
      </Layout.Header>
      <Layout.Content>
        <div
          className={"container"}
          style={{
            background: token.colorBgLayout,
            minHeight: 280,
            padding: "1rem",
            borderRadius: token.borderRadiusLG,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </Layout.Content>
      <Layout.Footer
        style={{
          textAlign: "center",
          background: token.colorBgSpotlight,
          color: token.colorBgBase,
        }}
      >
        Speclarify ©{new Date().getFullYear()} Created by{" "}
        <Link
          target={"_blank"}
          href={"https://www.linkedin.com/in/ali-eren-yogurtcu/"}
        >
          Eren Yogurtcu
        </Link>
      </Layout.Footer>
    </Layout>
  );
}
