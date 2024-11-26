# Homepage Features

## Aggregate Homepage content

> [!important]
> These features, along with most others in this project, rely heavily on `class` names, so please exercise caution when editing the site.

Webflow does now allow users to build content lists which contain different types of content. So, in order to create a homepage which aggregates all content types, the page needs to contain the following:

- Featured Block
  - A featured card containing the most recent content **from each content type**: `videos, articles, and podcasts`
- Body Content Lists
  - A collection list for each content type, limited to start at the 1st element (even if that duplicates the featured content above)

Once the page is setup, the following functions take care of the filtration, aggregation, and sorting.

### Filter Featured Content

Selects the featured content from each content type, hides each of them, then selects the newest by release date, shows it and returns the content type of that element: `video, story, or poscast`.

### Remove Featured Content from Body

Based on the returned `ContentType` from `filterFeaturedContent`, that list is selected and the topmost element is remove (assuming that content list is ordered newest to oldest, this should hide the element and prevent duplicate content from showing in the featured section and in this list).

### Group Body Content

Creates an array with all content from each collection list, sorts it by release date, removes them from the original list, and adds the ordered list to the target body list
