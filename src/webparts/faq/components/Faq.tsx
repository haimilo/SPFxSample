import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useState } from "react";
import { IFAQ } from "../../../interfaces";
import { getSP } from "../../../pnpConfig";
import { IFaqProps } from "./IFaqProps";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import styles from "./Faq.module.scss";

const Faq = (props: IFaqProps) => {

  // const LOG_SOURCE: string = "Faq WebPart";
  const LIST_NAME: string = "FAQ";
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = useState<IFAQ[]>([]);

  const getDataList = async () => {
    try {
      const items = await _sp.web.lists.getByTitle(LIST_NAME).items.select().orderBy('Letter', true).orderBy('Title', true)();
      setFaqItems(items);
      console.log(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <div>
      <h1>
        FAQ of {props.description}
      </h1>
      <>
        {
          faqItems.map((item: IFAQ, index: number) => {
            return (
              <Accordion
                collapsedIcon={"ChevronRight"}
                expandedIcon={"ChevronDown"}
                title={item.Title}
                defaultCollapsed={true}
                className={styles.itemCell}
                key={index}
              >
                <div className={"itemResponse"}>{item.Answer}</div>
              </Accordion>
            );
          })
        }
      </>
    </div>
  );
}

export default Faq;
