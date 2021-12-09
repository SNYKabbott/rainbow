/* eslint-disable sort-keys-fix/sort-keys-fix */
import chroma from 'chroma-js';
import React from 'react';
import { Box } from '../components/Box/Box';
import { Columns } from '../components/Columns/Columns';
import { Stack } from '../components/Stack/Stack';
import { Text } from '../components/Text/Text';
import { Docs as DocsType } from '../docs/types';
import source from '../docs/utils/source.macro';
import { ColorModeProvider } from './ColorMode';
import {
  BackgroundColor,
  backgroundColors,
  ColorMode,
  colors,
  ForegroundColor,
  foregroundColors,
} from './palettes';

const BackgroundColors = ({ mode }: { mode: ColorMode }) => (
  <Stack space="24px">
    <Text size="18px" weight="bold">
      {mode} mode
    </Text>
    <ColorModeProvider value={mode}>
      {(Object.keys(backgroundColors) as (keyof typeof backgroundColors)[]).map(
        (color: BackgroundColor) => (
          <Box background={color} key={color} padding="24px">
            <Text size="18px" weight="bold">
              {color}
            </Text>
          </Box>
        )
      )}
    </ColorModeProvider>
  </Stack>
);

const ForegroundColors = ({ mode }: { mode: ColorMode }) => (
  <Stack space="24px">
    <Text size="18px" weight="bold">
      {mode} mode
    </Text>
    <ColorModeProvider value={mode}>
      <Box background="body" padding="24px">
        <Stack space="12px">
          {(Object.keys(
            foregroundColors
          ) as (keyof typeof foregroundColors)[]).map(
            (color: ForegroundColor) => (
              <Text color={color} key={color} size="18px" weight="bold">
                {color}
              </Text>
            )
          )}
        </Stack>
      </Box>
    </ColorModeProvider>
  </Stack>
);

const PaletteColors = () => (
  <>
    {Object.entries(colors).map(([color, value]) => (
      <div
        key={color}
        style={{
          backgroundColor: value,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <Text
          color={{
            custom: chroma.contrast(value, '#fff') > 2.125 ? 'white' : 'black',
          }}
          size="18px"
          weight="bold"
        >
          {color}
        </Text>
      </div>
    ))}
  </>
);

const docs: DocsType = {
  name: 'Colors',
  category: 'Color',
  examples: [
    {
      name: 'Background colors',
      enableCodeSnippet: false,
      enablePlayroom: false,
      Example: () =>
        source(
          <Columns space="24px">
            <BackgroundColors mode="light" />
            <BackgroundColors mode="dark" />
          </Columns>
        ),
    },
    {
      name: 'Foreground colors',
      enableCodeSnippet: false,
      enablePlayroom: false,
      Example: () =>
        source(
          <Columns space="24px">
            <ForegroundColors mode="light" />
            <ForegroundColors mode="dark" />
          </Columns>
        ),
    },
    {
      name: 'Global palette',
      enableCodeSnippet: false,
      enablePlayroom: false,
      Example: () =>
        source(
          <Columns space="24px">
            <PaletteColors />
          </Columns>
        ),
    },
  ],
};

export default docs;
