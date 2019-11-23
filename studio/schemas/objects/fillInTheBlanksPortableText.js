import React from 'react';
export default {
    name: 'fillInTheBlanksPortableText',
    type: 'array',
    title: 'Body',
    of: [
      {
        type: 'block',
        title: 'Block',
        // Styles let you set what your user can mark up blocks with. These
        // corrensponds with HTML tags, but you can set any title or value
        // you want and decide how you want to deal with it where you want to
        // use your content.
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H1', value: 'h1'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'Quote', value: 'blockquote'}
        ],
        lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
        // Marks let you mark up inline text in the block editor.
        marks: {
          // Decorators usually describe a single property – e.g. a typographic
          // preference or highlighting by editors.
          decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title:'Blank', value:'blank',blockEditor:{
                  icon: ()=>(<span style={{ fontWeight: 'bold' }}>BK</span>),
                  render:(props)=>(<span style={{ backgroundColor: 'yellow' }}>{props.children}</span>)
              }}
            ],
          // Annotations can be any object structure – e.g. a link or a footnote.
          annotations: []
        },
        of: [],
        
      },
      // You can add additional types here. Note that you can't use
      // primitive types such as 'string' and 'number' in the same array
      // as a block type.
      {
        type: 'mainImage',
        options: {hotspot: true}
      }
    ]
  }
  