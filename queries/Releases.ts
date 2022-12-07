import { Release } from '../types/shared';
import { contentfulQuery } from './Query';

export async function getReleases() {
  const query = /* GRAPHQL */ `
    query ReleaseQuery {
      releaseCollection (limit: 100) {
        items {
          title
          artist
          slug
          description {
            json
          }
          artworkCollection {
            items {
              url
              title
              width
              height
              contentType
            }
          }
          bandcampEmbed
        }
      }
    }`;
  const { data } = await contentfulQuery(query);
  return data.releaseCollection.items as Release[];
}

export async function getReleasePage(slug: string) {
  const query = /* GRAPHQL */ `
    query SingleReleaseQuery($slug: String) {
      releaseCollection (where: { slug: $slug }, limit: 1) {
        items {
          title
          artist
          slug
          description {
            json
          }
          artworkCollection {
            items {
              url
              title
              width
              height
              contentType
            }
          }
          bandcampEmbed
        }
      }
    }`;
  const { data } = await contentfulQuery(query, { variables: slug });
  return data.releaseCollection.items[0] as Release;
}

export async function getReleasePaths() {
  const query = /* GRAPHQL */ `
    query ReleasePathsQuery {
      releaseCollection (limit: 100) {
        items {
          slug
        }
      }
    }
  `;

  const { data } = await contentfulQuery(query);
  const slugs = data.releaseCollection.items as { slug: string }[];

  const paths = slugs.map((release) => ({
    params: { slug: release.slug },
  }));

  return paths;
}
