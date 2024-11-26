## Custom Story Titles

Custom story titles allow `stories` and `articles` and other content of the sort which typically rely on `story-types` to leverage the rich-thumbnail system and enrich content. Before this feature, the conten's (without a story type) thumnail was empty. This feature (which I believe I just finished for the original developers) allows admins to add a `story-title` to the content. The story title is then parsed by this feature and broken up into two parts and injected into the thumbnail.

### Setup

Each `.card-label` already has a `.story-titles` div with the `story-type` content. This div is only rendered if a story type is set.

1. Duplicate that div and change the class name to `.story-titles__custom`
2. Set a data attribute on that div to `data-custom-title={{ Story Title }}` ([See How to add custom attributes in webflow](https://docs.developers.webflow.com/designer/reference/custom-attributes)).
3. Conditionall render the `.story-titles__custom` to when a `story-type is NOT set && story-title is set`
4. Now set the text content for both the `.title-blue` and `.title-outline` to the `story-title`. Ensure you are only changing the text content for these elements under `.story-titles__custom`, not under `.story-titles`.
5. **In the webflow-designer this will look wrong!** Don't worry- the custom code from this system isn't injected into the site until it is published. You *should* see the custom story title duplicated in the designer.
6. Publish the updates the the test domain `guerilla-sports.webflow.io` to ensure the changes worked correctly. You can also check the JS Console where logs should confim custom story title injection like this:

```
[gs-cdnflow/global]: formatting custom story title
```