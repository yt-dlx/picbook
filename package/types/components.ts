import { ImageMetadata, EnvironmentEntry } from "./database";

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type ColorValue = RGB | RGBA | HEX | string;

interface SubImageProps {
  image: ImageMetadata;
  index: number;
  onImagePress: (previewLink: string, index: number) => void;
  environmentData: DownloadScreenProps;
}

interface SubImagesProps {
  images: DownloadScreenProps;
  currentColors: ColorValue[];
  onImagePress: (previewLink: string, index: number) => void;
}

interface CardTextProps {
  data: EnvironmentEntry;
  currentIndex: number;
}

interface CardProps {
  data: EnvironmentEntry;
}

interface AlphabetGroupProps {
  title: string;
  items: EnvironmentEntry[];
}

interface CategoryButtonProps {
  category: string;
}

interface DownloadScreenProps {
  environment_prompt: string;
  environment_moral: string;
  environment_title: string;
  selectedIndex: number;
  data: ImageMetadata[];
}

type GroupedData = {
  [key: string]: EnvironmentEntry[];
};

interface ScrollingSlotProps {
  images: string[];
  reverse: boolean;
  delay: number;
}

export type {
  RGB,
  RGBA,
  HEX,
  ColorValue,
  ImageMetadata,
  EnvironmentEntry,
  SubImageProps,
  SubImagesProps,
  CardTextProps,
  CardProps,
  ScrollingSlotProps,
  AlphabetGroupProps,
  CategoryButtonProps,
  DownloadScreenProps,
  GroupedData
};
