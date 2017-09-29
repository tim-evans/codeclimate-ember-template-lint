# Code Climate ember-template-lint Engine

`codeclimate-ember-template-lint` is a Code Climate engine that wraps [ember-template-lint](https://github.com/rwjblue/ember-template-lint). You can run it on your command line using the Code Climate CLI, or on our hosted analysis platform.

### Installation & Usage

1. If you haven't already, [install the Code Climate CLI](https://github.com/codeclimate/codeclimate).
2. Run `codeclimate engines:enable ember-template-lint`. This command both installs the engine and enables it in your `.codeclimate.yml` file.
3. You're ready to analyze! Browse into your project's folder and run `codeclimate analyze`.

### Need help?

For help with ember-template-lint, [check out their documentation](https://github.com/rwjblue/ember-template-lint).

### Developing

To generate the engine, you'll need to build it as a docker image:

```bash
docker build -t codeclimate/codeclimate-ember-templatelint
```

You can then run this in an Ember app to test your changes:

```bash
codeclimate analyze --dev
```

To do this successfully, you may have to change the `channel` so it pulls the correct docker image.

You can start debugging your outbut by adding `debug: true` to your engine config. Your `.codeclimate.yml` should look like:

```yaml
ember-template-lint:
  enabled: true
  config:
    debug: true
```

Then, you can run the analyzer in debug mode via the following command:

```bash
CODECLIMATE_DEBUG=1 codeclimate analyze --dev
```
