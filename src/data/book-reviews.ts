import type { BookStatus } from "@/lib/bookStatus";

export type BookReview = {
  slug: string;
  title: string;
  author: string;
  status: BookStatus;
  image?: string;
  takeaway: string;
  review: string[];
};

type BaseBook = Omit<BookReview, "takeaway" | "review"> & {
  takeaway?: string;
  review?: string[];
};

const baseBooks: BaseBook[] = [
  {
    slug: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    status: "read",
    image: "/covers/project_hail_mary.jpg",
  },
  {
    slug: "artemis",
    title: "Artemis",
    author: "Andy Weir",
    status: "read",
    image: "/covers/artemis.jpg",
  },
  {
    slug: "armada",
    title: "Armada",
    author: "Ernest Cline",
    status: "read-noted",
    image: "/covers/armada.jpg",
    takeaway:
      "A slow start turns into a standout sci-fi read with a strong late twist and thoughtful commentary.",
    review: [
      "What started a little slow and a little too nerdy for my style quickly accelerated into one of my most favorite, if not top, reads of all time. Ernest Cline writes Armada from the perspective of Zack Lightman, whom I could relate to because of his strong affinity for and obsession with video games.",
      "It is cool to see a described scenario where what otherwise seems like a life wasted on 'that damn game' ends up being necessary for the defense of the planet. I liked the concept of a special draft, a secret military entity watching and tracking the skills of their players. I found it reminiscent of how kids sometimes imagine a scout drives by, secretly watching as they play basketball in their driveway. Similar vibes.",
      "Initially, I found his obsession with his father's memorabilia quite strange. I fully thought that was an overexpressed profile on Zack's background.",
      "It demonstrated how a person can fall into traps of either living in the past or living through another person. Zack does both. It was interesting waiting to see how the author would tie this all together, and it was certainly worth the wait. This read was truly incredible, and after entering Phase Two of the book, I could not stop reading.",
      "This book has an exceptional ending twist with the antagonist ending up much different from what was anticipated. An AI representative, sent by some intergalactic council to assess the human race's compatibility. This twist was thought-provoking because it reflects on society and humanity as a whole. How they respond to perceived threats, how they communicate with the public, how information gets distorted or parallelly theorized by the regular Joe.",
      "I felt a sense of extreme realism, hearing the description of a government conspiracy amplified to the maximum. Not so much the greatest comparison, but as the Epstein files are being released, it felt similar to how much the government chooses to hide.",
    ],
  },
  {
    slug: "we-are-legion",
    title: "We Are Legion (We are Bob)",
    author: "Dennis E. Taylor",
    status: "read-noted",
    image: "/covers/we_are_legion.jpg",
  },
  {
    slug: "for-we-are-many",
    title: "For We Are Many",
    author: "Dennis E. Taylor",
    status: "read",
    image: "/covers/many.jpeg",
  },
  {
    slug: "the-mountain-in-the-sea",
    title: "The Mountain in the Sea",
    author: "",
    status: "in-progress",
    image: "/covers/mountain.avif",
  },
  {
    slug: "ocean",
    title: "Ocean",
    author: "David Attenborough",
    status: "read",
    image: "/covers/ocean.jpg",
  },
  {
    slug: "abundance",
    title: "Abundance",
    author: "Ezra Klein & Derek Thompson",
    status: "not-started",
    image: "/covers/abundance.jpg",
  },
  {
    slug: "the-four-realms-of-existence",
    title: "The Four Realms of Existence",
    author: "Joseph E. LeDoux",
    status: "in-progress",
    image: "/covers/realms.jpg",
  },
];

const buildDefaultReview = (status: BookStatus): string[] => {
  if (status === "in-progress") {
    return ["Currently reading. Notes will be added after I finish this book."];
  }
  if (status === "not-started") {
    return ["Not started yet."];
  }
  if (status === "read") {
    return ["Finished reading. I have not added notes yet."];
  }
  return ["Read and noted status set. Full notes will be added soon."];
};

const buildTakeaway = (firstParagraph: string) => {
  const words = firstParagraph.trim().split(/\s+/).slice(0, 16).join(" ");
  return `${words}...`;
};

export const bookReviews: BookReview[] = baseBooks.map((book) => {
  const review = book.review ?? buildDefaultReview(book.status);
  return {
    ...book,
    review,
    takeaway: book.takeaway ?? buildTakeaway(review[0]),
  };
});
