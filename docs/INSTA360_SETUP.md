# Guia: Fotos 360° com Insta360 no Imerso

Este guia explica como exportar fotos do seu Insta360 e usá-las no Imerso para criar tours 360° interativos.

## 1. Exportar do Insta360

### Formato suportado

- **Formato**: JPG (equirectangular)
- **Proporção**: 2:1 (ex: 4096×2048, 8192×4096)
- **Resolução**: Quanto maior, melhor a qualidade (mínimo recomendado: 2048×1024)

### Passo a passo

1. **Conecte sua câmera Insta360** ao computador e copie as fotos (arquivos .insp)
2. **Abra o Insta360 Studio** ([insta360.com](https://www.insta360.com))
3. **Importe as fotos** que deseja usar
4. **Exporte** cada foto:
   - Menu: File → Export
   - Formato: **Photo** → **JPG**
   - Resolução: escolha a mais alta disponível
   - O resultado será uma imagem equirectangular 2:1

### Nota sobre arquivos .insp

As câmeras Insta360 salvam em formato proprietário (.insp). É necessário usar o Insta360 Studio para converter em JPG antes de usar no Imerso.

## 2. Adicionar as fotos ao projeto

1. Copie os arquivos JPG exportados para a pasta:
   ```
   imerso/public/images/
   ```

2. Exemplo de estrutura:
   ```
   public/images/
   ├── sala.jpg
   ├── cozinha.jpg
   ├── quarto.jpg
   └── varanda.jpg
   ```

## 3. Usar no código

### Foto única (PanoramaViewer)

```tsx
import { PanoramaViewer } from "@/components/panorama/PanoramaViewer";

<PanoramaViewer
  imageUrl="/images/sala.jpg"
  height={500}
  title="Sala de Estar"
  compass
/>
```

### Tour caminhável (múltiplos ambientes)

```tsx
import { VirtualTour } from "@/components/panorama/VirtualTour";

const tourConfig = {
  firstScene: "sala",
  sceneFadeDuration: 1000,
  scenes: {
    sala: {
      id: "sala",
      title: "Sala de Estar",
      panorama: "/images/sala.jpg",
      yaw: 0,
      pitch: 0,
      hotSpots: [
        {
          pitch: -10,
          yaw: 45,
          type: "scene",
          text: "Ir para cozinha",
          sceneId: "cozinha",
        },
      ],
    },
    cozinha: {
      id: "cozinha",
      title: "Cozinha",
      panorama: "/images/cozinha.jpg",
      hotSpots: [
        {
          pitch: -10,
          yaw: -45,
          type: "scene",
          text: "Voltar para sala",
          sceneId: "sala",
        },
      ],
    },
  },
};

<VirtualTour config={tourConfig} height={500} />
```

### Posicionando hotspots

- **pitch**: posição vertical (-90 a 90 graus)
- **yaw**: posição horizontal (-180 a 180 graus)
- Use a [ferramenta de configuração do Pannellum](https://pannellum.org/utils/config/) para encontrar os valores exatos

## 4. Dicas

- **Fotos consecutivas**: Tire fotos em posições adjacentes (ex: entrada de cada cômodo) para criar uma navegação natural
- **Hotspots**: Coloque os pontos de clique onde o usuário "entraria" no próximo ambiente
- **Otimização**: Para imagens muito grandes (>8192px), considere usar o [gerador multires do Pannellum](https://github.com/mpetroff/pannellum#using-generatepy-to-create-multires-panoramas) para melhor performance

## 5. Demonstração

Acesse `/demo` no seu projeto para ver exemplos funcionando com fotos de demonstração.
