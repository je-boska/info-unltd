import { Album } from '../types/shared';
import { contentfulQuery } from './Query';

export async function getAlbums() {
  const query = /* GRAPHQL */ `
    query AlbumQuery {
      albumCollection (limit: 100) {
        items {
          title
          artist
          slug
          description {
            json
          }
          artwork {
            url
            title
            width
            height
            contentType
          }
          bandcampLink
        }
      }
    }`;
  const { data } = await contentfulQuery(query);
  return data.albumCollection.items as Album[];
}
