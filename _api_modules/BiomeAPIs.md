---
name: BiomeAPIs
description: >
    This module provides you with ability to define biomes and assign them to
    blocks in the world.
---
You may create several biomes and assign them to blocks in world, and then
react to player movement between the biomes to control additional features.

## Usage
First, you need to define your biomes. You can do this by implementing the
`Biome` interface, preferably inside an enum, like this:
{% highlight java %}
public enum ExampleBiome implements Biome {
    EXAMPLE_BIOME_1("Example1", 1),
    EXAMPLE_BIOME_2("Example1", 2);
    
    private final String id;
    private final String name;
    private final short hash;
    
    ExampleBiome(String name, int hash) {
        this.name = name;
        this.id = "ExampleModule:" + name;
        this.hash = (short) hash;
    }
    
    @Override
    public String getId() {
        return this.id;
    }
 
    @Override
    public String getName() {
        return this.name;
    }
    
    @Override
    public String toString() {
        return this.name;
    }
    
    @Override
    public short biomeHash() {
        return this.hash;
    }
}
{% endhighlight %}

Then, you need to register those biomes with the module. You do that by
creating a new `ComponentSystem`, then injecting there `BiomeRegistry` and
calling `biomeRegistry.registerBiome()` for each of your biomes. Finally, you
can get `BiomeRegistry` through `CoreRegistry` into your rasterizer, and use
it to set the block biomes just as you would set blocks using `WorldProvider`.
You can also `@In BiomeRegistry` inside your systems to get biomes of specific
blocks for your own usage, and/or handle the `OnBiomeChangedEvent` to respond
to player entering/leaving a biome.