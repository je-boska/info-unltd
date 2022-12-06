import { Document } from '@contentful/rich-text-types';

export type ErrorPayloadMessage = {
  message: string;
  extensions: {
    contentful: {
      code: string;
      requestId: string;
      details: {
        maximumCost: number;
        cost: number;
      };
    };
  };
};

export type ErrorPayload = {
  errors: ErrorPayloadMessage[];
};

export interface Asset {
  sys: { id: string };
  contentType: string;
  title: string;
  description: string;
  url: string;
  width: number;
  height: number;
}

export interface Links {
  assets: {
    block: Asset[];
  };
}

export interface RichText {
  json: Document;
  links?: Links;
}

export interface Release {
  title: string;
  artist: string;
  slug: string;
  description: RichText;
  artwork: Asset;
  bandcampLink: string;
}

export interface Page {
  title: string;
  body: RichText;
}
