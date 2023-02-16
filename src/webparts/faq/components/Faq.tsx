import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useState } from "react";
import { IFAQ } from "../../../interfaces";
import { getSP } from "../../../pnpConfig";
import { IFaqProps } from "./IFaqProps";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import styles from "./Faq.module.scss";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

const Faq = (props: IFaqProps) => {

  // const LOG_SOURCE: string = "Faq WebPart";
  // const LIST_NAME: string = "FAQ";
  let _sp: SPFI = getSP(props.context);

  console.log("props", props);

  const [faqItems, setFaqItems] = useState<IFAQ[]>([]);

  const getDataList = async () => {
    try {
      const items = await _sp.web.lists.getById(props.listGuid).items.select().orderBy('Letter', true).orderBy('Title', true)();
      setFaqItems(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.listGuid && props.listGuid !== '') {
      getDataList();
    }
  }, [props]);

  return (
    <div>
      <WebPartTitle displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty} />
      <>
        {
          props.listGuid && faqItems.length > 0
            ?
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
            }) :
            <Placeholder iconName='Edit'
              iconText='Configure your web part'
              description='Please configure the web part.'
              buttonLabel='Configure'
              onConfigure={
                () => {
                  props.context.propertyPane.open();
                }
              }
            />
        }
      </>
    </div>
  );
}

export default Faq;
