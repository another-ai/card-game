import { PanInfo, motion } from "framer-motion";
import { useState } from "react";
import { CardProps } from "../types";
import { LangameIcon } from "./LangameIcon";

const Card: React.FC<CardProps> = ({
  card,
  removeCard,
  active,
  header,
  className = "",
  cardNumber = 0,
}) => {
  const [leaveX, setLeaveX] = useState(0);
  const [leaveY, setLeaveY] = useState(0);
  const onDragEnd = (_e: any, info: PanInfo) => {
    if (info.offset.y < -100) {
      setLeaveY(-2000);
      removeCard(card, "superlike");
      return;
    }
    if (info.offset.x > 100) {
      setLeaveX(1000);
      removeCard(card, "like");
    }
    if (info.offset.x < -100) {
      setLeaveX(-1000);
      removeCard(card, "nope");
    }
  };
  const classNames = `absolute h-[430px] w-[300px] bg-white shadow-xl rounded-2xl flex flex-col cursor-grab border-4 border-indigo-600 p-4 ${className}`;
  return (
    <>
      {active ? (
        <motion.div
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={onDragEnd}
          initial={{
            scale: 1,
          }}
          animate={{
            scale: 1.05,
            rotate: `${cardNumber % 2 === 0 ? 6 : -6}deg`,
          }}
          exit={{
            x: leaveX,
            y: leaveY,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={classNames}
          data-testid="active-card"
        >
          <div className="flex justify-between">
            <LangameIcon />{" "}
            <div className="text-gray-700 text-xs">{header}</div>
          </div>

          <div className="m-auto text-center">
            <Title title={card.name} />
          </div>

          <LangameIcon className="ml-auto" />
        </motion.div>
      ) : (
        <div
          className={`${classNames} ${
            cardNumber % 2 === 0 ? "rotate-6" : "-rotate-6"
          } `}
        >
          <Title title={card.name} />
        </div>
      )}
    </>
  );
};

const Title: React.FC<{ title: string }> = ({ title }) => {
  return <span className="text-xl font-bold text-center">{title}</span>;
};

export default Card;
