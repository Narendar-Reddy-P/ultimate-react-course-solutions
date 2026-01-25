import { useState } from "react";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
  },
  {
    title: "How long do I have to return my chair?",
    text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
  },
  {
    title: "Do you ship to countries outside the EU?",
    text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
  },
];

export default function App() {
  return (
    <div>
      <Accordion faqs={faqs} />
    </div>
  );
}

function Accordion() {
  const [curOpen, setCurOpen] = useState(null);
  return (
    <div className="accordion">
      {faqs.map((faq, i) => (
        <AccordionItem
          title={faq.title}
          num={i + 1}
          curOpen={curOpen}
          onOpen={setCurOpen}
        >
          <div className="content-box">{faq.text}</div>
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ num, title, curOpen, onOpen, children }) {
  let isOpen = curOpen === num;
  function handleClick() {
    if (isOpen) {
      onOpen(null);
    } else {
      onOpen(num);
    }
  }
  return (
    <div className={`item ${isOpen && "open"}`} onClick={handleClick}>
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && children}
    </div>
  );
}
