import React from 'react';

export default function Form({ action, formInfo, onSubmit, onChange }) {
  const { title, director, metascore, stars } = formInfo;

  return (
    <form onSubmit={onSubmit}>
      <label>
        Title:
        <input
          id='title'
          type='text'
          name='title'
          value={title}
          onChange={onChange}
          required
        />
      </label>

      <label>
        Director:
        <input
          id='director'
          type='text'
          name='director'
          value={director}
          onChange={onChange}
          required
        />
      </label>

      <label>
        MetaScore:
        <input
          id='metascore'
          type='number'
          name='metascore'
          value={metascore}
          onChange={onChange}
        />
      </label>

      <section className='textarea'>
        <label>
          Actors:
          <textarea
            rows='4'
            id='stars'
            name='stars'
            value={stars}
            onChange={onChange}
            required
          />
        </label>
      </section>

      <div className='form-submit-btn'>
        <button>
          {action === 'UPDATE' ? 'Update' : action === 'ADD' ? 'Add' : ''}
        </button>
      </div>
    </form>
  );
}
