import { Event } from '../types/shared';
import { contentfulQuery } from './Query';

export async function getEvents() {
  const query = /* GRAPHQL */ `
    query EventsQuery {
      eventCollection (limit: 100) {
        items {
          title
          slug
          mediaCollection {
            items {
               url
               title
               width
               height
               contentType
            }
          } 
        }
      }
    }`;
  const { data } = await contentfulQuery(query);

  return data.eventCollection.items as Event[];
}
