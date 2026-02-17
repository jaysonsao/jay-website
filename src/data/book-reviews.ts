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

const loremSentences = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Vivamus faucibus purus at urna eleifend, id laoreet arcu varius.",
  "Sed nec massa sit amet justo pellentesque luctus vitae ut lectus.",
  "Pellentesque habitant morbi tristique senectus et netus et malesuada.",
  "Integer at nibh vel lacus hendrerit viverra at in justo.",
  "Aliquam erat volutpat, feugiat quis aliquet ac, tempus sit amet sem.",
  "Donec finibus dui id mi luctus, non porta nibh iaculis.",
  "Curabitur iaculis justo sed velit blandit, sed interdum purus luctus.",
  "Mauris auctor neque non sem sodales, vel malesuada velit suscipit.",
  "Etiam ac elit sed turpis tincidunt malesuada non et odio.",
  "Suspendisse ultricies ligula at risus eleifend tristique.",
  "Nullam efficitur massa quis diam consectetur, in feugiat nisl euismod.",
  "Aenean convallis metus et purus suscipit, at dictum mauris volutpat.",
  "Morbi congue magna non massa lacinia, vitae faucibus erat mattis.",
  "Nunc id tortor sit amet arcu interdum mattis sed ut sapien.",
  "Quisque vitae orci at augue imperdiet hendrerit vitae eget enim.",
  "Praesent non velit non erat tincidunt convallis in sed augue.",
  "Phasellus vulputate sapien sed erat bibendum, vitae tempor nunc ultricies.",
  "Ut gravida tortor eu justo suscipit tincidunt.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
];

const hashString = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const mulberry32 = (seed: number) => {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
};

const buildReviewParagraphs = (seedKey: string, count = 4) => {
  const random = mulberry32(hashString(seedKey));
  const paragraphs: string[] = [];

  for (let paragraph = 0; paragraph < count; paragraph += 1) {
    const sentenceCount = 3 + Math.floor(random() * 3);
    const chosen: string[] = [];

    for (let sentence = 0; sentence < sentenceCount; sentence += 1) {
      const pick = loremSentences[Math.floor(random() * loremSentences.length)];
      chosen.push(pick);
    }

    paragraphs.push(chosen.join(" "));
  }

  return paragraphs;
};

const buildTakeaway = (firstParagraph: string) => {
  const words = firstParagraph.trim().split(/\s+/).slice(0, 16).join(" ");
  return `${words}...`;
};

export const bookReviews: BookReview[] = baseBooks.map((book) => {
  const review = book.review ?? buildReviewParagraphs(book.slug);
  return {
    ...book,
    review,
    takeaway: book.takeaway ?? buildTakeaway(review[0]),
  };
});
