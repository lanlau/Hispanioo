import React from 'react'
export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Underline',
            value: 'u',
            blockEditor: {
              icon: () => <span style={{ 'text-decoration': 'underline' }}>U</span>,
              render: props => (
                <span style={{ 'text-decoration': 'underline' }}>{props.children}</span>
              )
            }
          },
          {
            title: 'Strike',
            value: 'strike',
            blockEditor: {
              icon: () => <span style={{ 'text-decoration': 'line-through' }}>R</span>,
              render: props => (
                <span style={{ 'text-decoration': 'line-through' }}>{props.children}</span>
              )
            }
          }
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url'
              }
            ]
          },
          {
            name: 'pdf',
            type: 'file',
            title: 'PDF',
            fields: [{ title: 'Title', name: 'title', type: 'string' }]
          }
        ]
      },
      of: [{ type: 'authorReference' }]
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'mainImage',
      options: { hotspot: true }
    },
    {
      type: 'code'
    },
    {
      type: 'file',
      name: 'File',
      title: 'File',
      fields: [{ title: 'Title', name: 'title', type: 'string' }]
    },
    {
      type: 'outsideImage'
    }
  ]
}
