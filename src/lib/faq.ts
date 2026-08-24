import faq from "../../meta/faq.yml";

export type FaqContent = {
  readonly question: string;
  readonly answer: string;
};

export function listFaqs(): FaqContent[] {
  return faq.faqs;
}
