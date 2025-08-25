# Rails Scroll Effects

> [!Important]
> This is not a gem, read the [How It Works](#how-it-works) section to learn how to apply these effects in your project.

Rails Scroll Effects is a collection of scroll-triggered CSS animations for Ruby on Rails, using Stimulus controllers.

## Features

Currently there are four different scroll effects:

- **Fade In** - Elements fade in with opacity animation
- **Zoom In** - Elements zoom in from smaller scale  
- **Zoom Out** - Elements zoom out from larger scale
- **Flip Left** - Elements flip horizontally on scroll

And you can tweak each animation depending on your needs:

- Set the duration, delay, and trigger options.
- Support for both immediate and scroll-based triggers
- Reversible animations when scrolling back up

## How It Works

Each scroll effect is implemented using:

1. **Stimulus Controllers** (`app/javascript/controllers/`) - All the animation logic is inside this Javascript file
2. **Rails Partials** (`app/views/effects/`) - Reusable partials
3. **CSS Transitions** - Smooth animations applied via JavaScript

To use any of the effects displayed, copy the javascript controller and put it inside `app/javascript/controllers/`, after that wrap the section you want to animate with the desired effect, for example:

```
  <div 
    data-controller="fade-in"
    data-fade-in-duration-value="350" 
    data-fade-in-delay-value="200"
    data-fade-in-trigger-value="scroll"
  >
    <%# Your code goes here! :) %>
  </div>
```

> [!Warning]
> Make sure there is only one child div per animation parent.

## Install this repo locally

1. Clone the repository
2. Install dependencies:
   ```bash
   bundle install
   ```
3. Install JavaScript dependencies and build CSS:
   ```bash
   rails assets:precompile
   ```

## Development

Start the development server:
```bash
  ./bin/dev
```

This will start both the Rails server and watch for CSS/JS changes with Tailwind.

## Project Structure

```
app/
├── controllers/effects_controller.rb    # Main controller
├── views/
│   ├── effects/                        # Effect partials
│   └── examples/                       # Example implementations
└── javascript/controllers/              # Stimulus controllers for each effect
```
