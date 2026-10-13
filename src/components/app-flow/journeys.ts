import { Compass, Home, type LucideIcon } from "lucide-react";

export type JourneyStep = {
  title: string;
  description: string;
  image: string;
};

export type JourneyAccent = {
  text: string;
  bg: string;
  soft: string;
  softText: string;
};

export type Journey = {
  key: "traveller" | "local";
  label: string;
  icon: LucideIcon;
  kicker: string;
  headline: string;
  note?: string;
  examples?: string[];
  accent: JourneyAccent;
  steps: JourneyStep[];
};

export const JOURNEYS: Journey[] = [
  {
    key: "traveller",
    label: "Traveller",
    icon: Compass,
    kicker: "Your journey as a Traveller",
    headline: "Discover a city like a local",
    accent: {
      text: "text-coral",
      bg: "bg-coral",
      soft: "bg-coral/10",
      softText: "text-coral",
    },
    steps: [
      {
        title: "Your destination, your time",
        description: "Choose your destination and travel dates.",
        image: "/images/traveller-city.png",
      },
      {
        title: "Exactly your taste",
        description:
          "Pick what you're in the mood for, from sports and food to hidden gems and nightlife.",
        image: "/images/traveller-preferences.png",
      },
      {
        title: "Discover what's happening around you",
        description:
          "Experiences, locals, and communities right on the map.",
        image: "/images/traveller-map.png",
      },
      {
        title: "Find something that lasts",
        description:
          "Open an experience, get to know the person behind it, and decide if it's right for you.",
        image: "/images/traveller-package-overview.png",
      },
    ],
  },
  {
    key: "local",
    label: "Local",
    icon: Home,
    kicker: "Your journey as a Local",
    headline: "Turn what you love into an experience",
    note: "You don't need to be a tour guide to get travellers excited about your city.",
    examples: [
      "Cooking & baking classes",
      "Running meetups",
      "Football sessions",
      "Photo spots",
      "Foodie tours",
      "Community events",
    ],
    accent: {
      text: "text-ink",
      bg: "bg-ink",
      soft: "bg-ink/8",
      softText: "text-ink/70",
    },
    steps: [
      {
        title: "Create your experience",
        description:
          "Photos, description, location, and dates, ready to go in minutes.",
        image: "/images/local-create-package.png",
      },
      {
        title: "Get discovered",
        description:
          "Your tags make sure the right travellers find you.",
        image: "/images/local-set-preferences.png",
      },
      {
        title: "Receive your first booking",
        description: "You'll be notified as soon as someone signs up.",
        image: "/images/local-confirmation-email.png",
      },
      {
        title: "Build your community",
        description: "Keep track of bookings and guests at any time.",
        image: "/images/local-bookings.png",
      },
    ],
  },
];
