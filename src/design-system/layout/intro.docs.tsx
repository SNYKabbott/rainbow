import React from 'react';
import * as Docs from '../docs/components';
import { Docs as DocsType } from '../docs/types';

const docs: DocsType = {
  category: 'Layout',
  description: [
    <Docs.Text key="1">
      In a component system, the role of layout components is to apply space
      within containers and between sibling elements. For this model to work,
      individual components should <Docs.Strong>not</Docs.Strong> have any
      surrounding space. If components have margins built into them, it becomes
      difficult to compose them into a layout because space will be unbalanced
      by default.
    </Docs.Text>,
    <Docs.Text key="2">
      To better understand layout, let&apos;s step through the available layout
      components and show how they can be composed together.
    </Docs.Text>,
    <Docs.Blockquote key="3">
      <Docs.Text>
        Note that all layout components accept spacing values from our standard
        space scale (e.g. <Docs.Code>space=&quot;19px&quot;</Docs.Code>) which
        helps reduce the amount of variation in our layouts. These are modeled
        as strings to make autocompletion easier and to allow for other naming
        conventions in the future. If you need to use a value that doesn&apos;t
        exist in the scale, it can be provided in the following format:{' '}
        <Docs.Code>
          space={'{{'} custom: 17 {'}}'}
        </Docs.Code>
        .
      </Docs.Text>
    </Docs.Blockquote>,
  ],
  name: 'Introduction',
};

export default docs;