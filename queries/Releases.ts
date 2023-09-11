import { Release } from '../types/shared';
import { contentfulQuery } from './Query';

export async function getReleases() {
  const query = /* GRAPHQL */ `
    query ReleaseQuery {
      releaseCollection (limit: 100, order: catalogNumber_DESC) {
        items {
          title
          artist
          slug
          catalogNumber
          description {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  contentType
                  title
                  url
                }
              }
            }
          }
          artworkCollection (limit: 8) {
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
