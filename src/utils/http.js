import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const url = 'http://localhost:3000/events';

export async function fetchEvents({ signal, searchTerm, max }) {
  let searchUrl = url;
  if (searchTerm && max) {
    searchUrl += '?searchTerm=' + searchTerm + '&max=' + max;
  } else if (searchTerm) {
    searchUrl += '?search=' + searchTerm;
  } else if (max) {
    searchUrl += '?max=' + max;
  }

  const response = await fetch(searchUrl, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(event) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  });
  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { event: newEvent } = await response.json();
  return newEvent;
}

export async function fetchSelectedImages({ signal }) {
  const response = await fetch(`${url}/images`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const { images } = await response.json();

  return images;
}

export async function fetchEvent({ signal, id }) {
  const response = await fetch(`${url}/${id}`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = response.status;
    error.info = await response.json();
  }

  const { event } = await response.json();

  // return event object with image url
  return event;
}

export async function deleteEvent({ id }) {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function updateEvent({ id, event }) {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ event }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = new Error('An error occurred while updating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
