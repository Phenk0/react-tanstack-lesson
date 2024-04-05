import { useQuery } from '@tanstack/react-query';

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../utils/http.js';

export default function RecentEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    // recheck changes every 5 seconds, if true -> updates
    staleTime: 1000 * 5
    // clear cache after 1 second (that forces refetch data) //default 5 minutes
    // gcTime: 1000,
  });

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    console.log(error);
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events'}
      />
    );
  }
  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
