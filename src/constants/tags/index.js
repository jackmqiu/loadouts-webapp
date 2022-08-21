import accessoryTagsFixture from "./accessoryTagsFixture";
import gunTagsFixture from "./gunTagsFixture";
import otherTagsFixture from "./otherTagsFixture";
import pistolTagsFixture from "./pistolTagsFixture";

const tagsFixture = {
    ...accessoryTagsFixture,
    ...gunTagsFixture,
    ...otherTagsFixture,
    ...pistolTagsFixture,
}

export default tagsFixture;

// export { default as accessoryTagsFixture } from "./accessoryTagsFixture";
// export { default as gunTagsFixture } from "./gunTagsFixture";
// export { default as otherTagsFixture } from "./otherTagsFixture";
// export { default as pistolTagsFixture } from "./pistolTagsFixture";
