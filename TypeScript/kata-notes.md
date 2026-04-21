# Notes on the Gilded Rose kata

## Changes

I split the updateQuality method into several smaller methods that address each type of item in the store. The original code tries to save on instructions at the cost of clarity for a human editor. This lets anyone working with the code look into behaviors or errors at the type level.

I made updateQuality check the start of the item name to sort to item handling methods, to cover the case that an item is not named exactly one of the strings in the test.

I implemented the Conjured item type as described in the requirements.

## What I did not change

As requested, I left the Item class alone. The name field is overloaded in that it drives logica on top of being a human readable descriptor. I would have like to have edited the class so that it had a type field for sorting the items into their appropriate handlers. This would also have let me use a cleaner sort method in updateQuality - maybe checking against an enum of types, for instance, rather than use the clunky `String.startsWith`.

I also left the `updateQuality` method name alone, though I would prefer to change it to something like `updateItems`. The method modifies more than just quality on the items, and so the name should reflect that.

Ultimately an updateMethod that replaced the items array rather than mutated the objects in the array would be preferable to prevent the risk of side effects, but the requirements call for mutation over pure functions.

## What I would do with more time

I wanted to set up unit tests for the item type handlers, but I did not have time. Instead I focused on running diffs against the legacy `updateQuality` and its replacement's output using the 30 day test.