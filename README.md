# Contacts

A contact directory backed by DummyAPI. Each card represents a remote contact, with one modal shared by create and edit flows.

[Open the live demo](https://contacts-indol.vercel.app/) · [View screenshot](https://raw.githubusercontent.com/onisEg/resume/23df91e50f87b60e1360d79edcc24cf77eb09b07/public/projects/contacts.webp)

## Contact lifecycle

1. On load the list requests `/user` with an application ID header. The search box filters the returned contacts by full name and ignores letter case.
2. Add opens an empty form. Edit pre-fills first name, last name, email and picture from the selected card. Saving chooses POST `/user/create` or PUT `/user/{id}` according to edit mode.
3. After a successful save the modal closes and the list is fetched again. Delete removes the selected card locally after the response and then refreshes the list. API validation messages are surfaced through toasts.

## Run locally

Use Node.js 22.12 or later and npm. From the repository root, run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To build the distributable files in `dist/`, run `npm run build`. To serve that build locally, run `npm run preview`.

## Source guide

| File or directory | What to look for |
| --- | --- |
| [src/components/UserList/UserList.jsx](src/components/UserList/UserList.jsx) | Active request code, search filter, modal state and refresh logic. |
| [src/components/ContactModal/AddContactModal.jsx](src/components/ContactModal/AddContactModal.jsx) | Shared form for a new or existing contact. |
| [src/components/ContactCard](src/components/ContactCard) | Contact presentation and actions. |
| [src/dummyApi.js](src/dummyApi.js) | Additional endpoint definitions. The list component defines its own request parameters. |

## Manual walkthrough

Search for a displayed surname using different capitalisation. In a test workspace, add a contact with fictional details, edit it and reload. When diagnosing a failed request, check the application ID configuration in the active list component and the error response from DummyAPI.
